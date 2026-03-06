import { useLoginMutation } from '../../services/conduit';
import { useActionState } from 'react';

export default function Login() {
  const [login] = useLoginMutation();
  const [errorMsg, formAction, isPending] = useActionState(
    async (_previousState: string | null, formData: FormData) => {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      try {
        await login({ user: { email, password } }).unwrap();
        return null; // Éxito
      } catch (err: any) {
        return err?.data?.errors
          ? 'Invalid email or password'
          : 'Something went wrong';
      }
    },
    null,
  );

  return (
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Sign in</h1>
            <p className='text-xs-center'>
              <a href='/register'>Need an account?</a>
            </p>

            {/* Mostramos el error si existe */}
            {errorMsg && (
              <ul className='error-messages'>
                <li>{errorMsg}</li>
              </ul>
            )}

            <form action={formAction}>
              <fieldset className='form-group'>
                <input
                  name='email'
                  className='form-control form-control-lg'
                  type='email'
                  placeholder='Email'
                  required
                />
              </fieldset>
              <fieldset className='form-group'>
                <input
                  name='password'
                  className='form-control form-control-lg'
                  type='password'
                  placeholder='Password'
                  required
                />
              </fieldset>
              <button className='btn btn-lg btn-primary pull-xs-right'>
                {isPending ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
