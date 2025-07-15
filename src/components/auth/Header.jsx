import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

const Header = ({msg1, msg2}) => {

	return (
		<>
			<div className="text-center mb-8">
				<div className="inline-block p-3 rounded-full mb-1">
					<FontAwesomeIcon icon={faLayerGroup} className="text-brand text-3xl" />
				</div>
				<h2 className="text-3xl font-bold text-text-primary">Create Your Account</h2>
				<p className="text-text-secondary mt-2">Start your journey to financial freedom.</p>
			</div>
		</>
	)
}

export default Header;