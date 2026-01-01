import logo from '../../public/logo.png'

function Footer() {
  return (
    <footer className="footer sm:footer-horizontal footer-center text-base-content p-4">
      <center>
        <img src={logo} className='w-32 pb-4' alt="Scilents AI Logo"/>
      </center>
      <p className="text-center text-sm text-slate-600">Copyright © {new Date().getFullYear()} scilents-ai. Built with ♥ by <a className='text-cyan-600'  target="_blank" href="https://github.com/dantgn">dantgn</a></p>
    </footer>
  )
}

export default Footer