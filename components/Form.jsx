'user client'
import Link from "next/link";

const Form = ({ type, post,session, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>Hi, {session?.user.name}</span>
      </h1>
      <p className='desc text-left max-w-md text-2xl'>
      write down what you're grateful for daily to attract more things you desire in life.
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='text-2xl font-satoshi font-semibold  text-gray-700'>
            What are you grateful for today?
          </span>

          <textarea
            value={post.note}
            onChange={(e) => setPost({ ...post, note: e.target.value })}
            placeholder='Jot them down here'
            required
            className='form_textarea '
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-  text-gray-700'>
            Hashtag{" "}
            <span className='font-normal'>
              (#thankyou, #moneylovesme, #ilovetraveling,goodvibes etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;