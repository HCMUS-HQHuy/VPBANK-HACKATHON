import { Link } from 'react-router-dom';

const Footer = ({url, page, msg}) => {

	return (
		<>
			<p className="text-center text-sm text-text-secondary mt-8">
			{msg}
			<Link to={`${url}`} className="font-semibold text-text-accent hover:underline">
				{page}
			</Link>
			</p>
		</>
	)
}

export default Footer;