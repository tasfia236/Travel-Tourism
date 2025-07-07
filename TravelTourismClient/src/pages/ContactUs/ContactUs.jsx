

const ContactUs = () => {
  return (
    <div className='bg-gradient-to-b from-sky-50 via-white to-blue-100 px-6 py-20 min-h-screen'>
      <div className='bg-white shadow-xl mx-auto p-8 md:p-12 rounded-3xl max-w-5xl'>
        <h2 className='mb-10 font-extrabold text-sky-600 text-4xl text-center'>
          Contact Us
        </h2>

        <div className='gap-8 grid md:grid-cols-2'>
          {/* Contact Info */}
          <div className='space-y-6'>
            <p className='text-gray-600'>
              We’d love to hear from you! Whether you have a question about a
              tour, pricing, or anything else — our team is ready to answer all
              your questions.
            </p>
            <div>
              <p className='font-bold text-gray-700'>Phone:</p>
              <p className='text-gray-600'>+880 1234-567890</p>
            </div>
            <div>
              <p className='font-bold text-gray-700'>Email:</p>
              <p className='text-gray-600'>support@travelyours.com</p>
            </div>
            <div>
              <p className='font-bold text-gray-700'>Location:</p>
              <p className='text-gray-600'>Chittagong, Bangladesh</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className='space-y-6'>
            <input
              type='text'
              placeholder='Your Name'
              className='shadow-sm px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 w-full'
              required
            />
            <input
              type='email'
              placeholder='Your Email'
              className='shadow-sm px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 w-full'
              required
            />
            <textarea
              rows='5'
              placeholder='Your Message'
              className='shadow-sm px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 w-full'
              required
            ></textarea>
            <button
              type='submit'
              className='bg-sky-500 hover:bg-sky-600 py-3 rounded-md w-full font-semibold text-white transition'
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
