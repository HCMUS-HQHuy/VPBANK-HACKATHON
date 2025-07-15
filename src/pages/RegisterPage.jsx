import Footer from '../components/auth/Footer';
import Header from '../components/auth/Header';

const FormField = ({ id, label, type, placeholder, autoComplete }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-text-secondary">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      required
      placeholder={placeholder}
      autoComplete={autoComplete}
      className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
    />
  </div>
);

const RegisterPage = () => {
  return (
      <>
        <Header ms1={'Create Your Account'} msg2={'Start your journey to financial freedom.'}/>

        {/* Registration Form */}
        <form className="space-y-6">
         <FormField
            id="name"
            label="Full Name"
            type="text"
            placeholder="Alex Doe"
            autoComplete="name"
          />
          <FormField
            id="email"
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
          />
          <FormField
            id="confirm-password"
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
          />

          <button
            type="submit"
            className="w-full py-3 bg-brand text-card font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-brand-primary/20"
          >
            Register
          </button>
        </form>
        <Footer url={'/login'} page={'Log In'} msg={'Already have an account? '} />
      </>
  );
};

export default RegisterPage;