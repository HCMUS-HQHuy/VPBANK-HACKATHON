import Footer from '../components/auth/Footer';
import Header from '../components/auth/Header';

const LoginPage = () => {
  return (
    <>
		<Header msg1={'Welcome Back'} msg2={'Log in to continue to FinCoach.'}/>

		{/* Login Form */}
		<form className="space-y-6">
		<div>
			<label htmlFor="email" className="text-sm font-medium text-text-secondary">Email address</label>
			<input id="email" name="email" type="email" required placeholder="you@example.com" className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring" />
		</div>
		<div>
			<label htmlFor="password" className="text-sm font-medium text-text-secondary">Password</label>
			<input id="password" name="password" type="password" required placeholder="••••••••" className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring" />
		</div>
		<div>
			<button type="submit" className="w-full py-3 bg-brand text-card font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-brand-primary/20">
			Log In
			</button>
		</div>
		</form>

		<Footer url={'/register'} page={'Register'} msg={'Don\'t have an account? '} />
    </>
  );
};

export default LoginPage;