import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram }  from '@fortawesome/free-brands-svg-icons/faInstagram'
import { faLinkedin }   from '@fortawesome/free-brands-svg-icons/faLinkedin'
import { faWhatsapp }   from '@fortawesome/free-brands-svg-icons/faWhatsapp'
import { faThreads }    from '@fortawesome/free-brands-svg-icons/faThreads'

const Socials = () => {
  return (
    <div className="bg-white w-full flex justify-evenly items-center py-2 h-full font-bold text-black select-none rounded-xl">
      <a href="https://www.instagram.com/manilla_lawfirm/" target='__blank'>
        <FontAwesomeIcon icon={faInstagram} size="2x" className='text-black' />
      </a>
      <a href="https://www.linkedin.com/company/manilla-law-firm/" target='__blank'>
        <FontAwesomeIcon icon={faLinkedin} className='text-black' size="2x" />
      </a>
      <a href="https://www.threads.net/@manilla_lawfirm" target='__blank'>
        <FontAwesomeIcon icon={faThreads} size="2x" className='text-black' />
      </a>
      <a href="https://wa.me/7016934885" target='__blank'>
        <FontAwesomeIcon icon={faWhatsapp} className='text-black' size="2x" />
      </a>
    </div>
  )
}

export default Socials
