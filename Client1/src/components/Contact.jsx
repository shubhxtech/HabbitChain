import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    alert('Message submitted!');
  };

  return (
    <>

    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl z-10">
        {/* Left side: Contact Form */}
        <div className=" p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-white tranastion duration-300 focus:outline-none"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm tranastion duration-300 font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md focus:ring-2 tranastion duration-300 focus:ring-white focus:outline-none"
                placeholder="Your Email"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2  rounded-md focus:ring-2 focus:ring-white focus:outline-none"
                rows="5"
                placeholder="Your Message"
                required 
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-white opacity-80 border-white transition-all py-2 hover:shadow-[0_0_5px_2px_rgba(255,255,255,0.8)] duration-300 rounded-md text-black font-bold"
              >
              Submit
            </button>
          </form>
        </div>

        {/* Right side: Profile */}
        <div className="flex flex-col items-center justify-center text-center space-y-4 p-8 rounded-lg shadow-lg">
          <img
            src="https://res.cloudinary.com/dlpitjizv/image/upload/q_60/01292024_What_Is_a_White_Hat_Hacker_hero_ca55555c96.jpg" // Replace with your image URL
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 border-white border-4"
          />
          <h3 className="text-2xl font-bold">White Hat Hacker</h3>
          <p className="text-gray-400">Find Mey</p>
          <p className="text-gray-400">Phone: xyuiuopq</p>
          <div className="flex space-x-4">
            <a href="https://instagram.com" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default Contact;
