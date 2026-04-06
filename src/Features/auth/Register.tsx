import { useRegisterMutation } from '../../services/conduit';
import { Navigate } from 'react-router';
import { useActionState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { type ConduitError } from '../../services/types';

export default function Register() {
  const [register] = useRegisterMutation();
  const { token } = useAppSelector((state) => state.auth);

  const [errorMsg, formAction, isPending] = useActionState(
    async (_: string | null, formData: FormData) => {
      const payload = {
        user: {
          username: formData.get('username') as string,
          email: formData.get('email') as string,
          password: formData.get('password') as string,
        },
      };

      try {
        await register(payload).unwrap();

        return null;
      } catch (err) {
        const error = err as ConduitError;
        return error?.data?.errors
          ? 'Invalid email or password'
          : 'Something went wrong';
      }
    },
    null,
  );

  if (token) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Sign up</h1>
            <p className='text-xs-center'>
              <a href='/login'>Have an account?</a>
            </p>
            {errorMsg && (
              <ul className='error-messages'>
                <li>That email is already taken</li>
              </ul>
            )}

            <form action={formAction}>
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  type='text'
                  placeholder='Username'
                  name='username'
                  required
                />
              </fieldset>
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  type='text'
                  placeholder='Email'
                  name='email'
                  required
                />
              </fieldset>
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  type='password'
                  placeholder='Password'
                  name='password'
                  required
                />
              </fieldset>
              <button className='btn btn-lg btn-primary pull-xs-right'>
                {isPending ? 'Sing in up' : 'Sing up'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
