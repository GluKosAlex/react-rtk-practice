function Footer() {
  const date = new Date();

  return (
    <footer className='flex min-h-10 bg-slate-700 text-white'>
      <div className='flex justify-between w-full max-w-5xl p-4 mx-auto'>
        <a
          className='text-bold'
          href='https://github.com/GluKosAlex'
          target='_blank'
          rel='noopener noreferrer'
        >
          © Konstantin Glushenkov
        </a>

        <span>{date.getFullYear()}</span>
      </div>
    </footer>
  );
}
export default Footer;
