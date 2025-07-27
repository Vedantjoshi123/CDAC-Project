import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { updateTeacherProfile } from '../../services/teacherService';
import { Pencil } from 'lucide-react';

const UpdateTeacher = () => {
const { token, user } = useContext(AppContext);

  const [preview, setPreview] = useState(user?.imageUrl || '');

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    dob: user?.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
    qualification: user?.qualification || '',
    experience: user?.experience || '',
    specialization: user?.specialization || '',
    about: user?.about || '',
    image: null,
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      country: user?.address?.country || '',
      zipCode: user?.address?.zipCode || '',
    },
  });
  useEffect(() => {
    if (formData.image) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(formData.image);
    }
  }, [formData.image]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['street', 'city', 'state', 'country', 'zipCode'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };
 const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(); // ✅ Correctly initialized

  Object.entries(formData).forEach(([key, value]) => {
    if (key === 'address') {
      Object.entries(value).forEach(([addrKey, addrVal]) => {
        data.append(addrKey, addrVal);
      });
    } else if (key === 'image' && value) {
      data.append('image', value);
    } else if (key !== 'email') { // Exclude email if not updatable
      data.append(key, value);
    }
  });

  try {
    const res = await updateTeacherProfile(user.id, data, token);
    if (res.status === 'success') {
      toast.success('Profile updated successfully!');
      navigate('/teacher'); // or wherever you want to go
    } else {
      toast.error(res.message || 'Something went wrong');
    }
  } catch (err) {
    console.error(err);
    toast.error('Something went wrong');
  }
};

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center mb-6 relative">
        <div className="relative w-36 h-36">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-green-600 shadow-md bg-gray-100 flex items-center justify-center">
            {preview ? (
              <img src={preview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <Pencil className="w-10 h-10 text-gray-400" />
            )}
          </div>
          <label
            htmlFor="image"
            className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full cursor-pointer hover:bg-green-700"
            title="Edit Photo"
          >
            <Pencil className="w-4 h-4 text-white" />
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-800">Update Profile</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label text="First Name" required />
            <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div>
            <Label text="Last Name" required />
            <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div>
            <Label text="DOB" required/>
            <Input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          </div>
            <div>
              <Label text="Qualification" />
              <Input name="qualification" value={formData.qualification} onChange={handleChange} required />
            </div>
            <div>
              <Label text="Specialization" />
              <Input name="specialization" value={formData.specialization} onChange={handleChange} required />
            </div>
            <div>
              <Label text="Experience (Years)" />
              <Input name="experience" value={formData.experience} onChange={handleChange} required />
            </div>
        </div>

        <div>
          <Label text="About / Bio" />
          <textarea
            name="about"
            rows="4"
            value={formData.about}
            onChange={handleChange}
            className="w-full border p-2 rounded resize-none"
          />
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mt-8">Address</h3>
        <div className="grid grid-cols-2 gap-4">
          {['street', 'city', 'state', 'country', 'zipCode'].map((field) => (
            <div key={field}>
              <Label text={field.charAt(0).toUpperCase() + field.slice(1)}  />
              <Input
                name={field}
                value={formData.address[field]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 shadow-md"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
const Label = ({ text, required }) => (
  <label className="block text-sm font-medium mb-1">
    {text} {required && <span className="text-red-500">*</span>}
  </label>
);
const Input = ({ name, value, onChange, type = 'text', required }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    className="w-full border p-2 rounded"
    required={required}
  />
);

export default UpdateTeacher;

