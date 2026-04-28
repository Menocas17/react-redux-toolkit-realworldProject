import { logout } from '../auth/authSlice';
import { conduitApi } from '../../services/conduit';
import { useAppDispatch } from '../../store/hooks';
import { useUpdateUserMutation } from '../../services/conduit';
import { useActionState } from 'react';
import type { ConduitError } from '../../services/types';

type ActionState = { [key: string]: string[] } | null;

//TODO - Display the current info in the form

export default function Settings() {
  const dispatch = useAppDispatch();
  const [update] = useUpdateUserMutation();

  const [errMsg, formAction, isPending] = useActionState<ActionState, FormData>(
    async (_, formData) => {
      const image = formData.get('picture')?.toString() || undefined;
      const username = formData.get('name')?.toString() || undefined;
      const bio = formData.get('bio')?.toString() || undefined;
      const email = formData.get('email')?.toString() || undefined;
      const password = formData.get('password')?.toString() || undefined;

      try {
        await update({
          user: { username, email, bio, image, password },
        }).unwrap();
        return null;
      } catch (err) {
        const error = err as ConduitError;
        return error?.data.errors;
      }
    },
    null,
  );

  const handleLogout = () => {
    dispatch(logout());
    dispatch(conduitApi.util.resetApiState());
  };

  return (
    <div className='settings-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Your Settings</h1>

            {errMsg && (
              <ul className='error-messages'>
                {Object.entries(errMsg).map(([field, messages]) =>
                  messages.map((message, index) => (
                    <li key={`${field} - ${index}`}>
                      {field} {message}
                    </li>
                  )),
                )}
              </ul>
            )}

            <form action={formAction}>
              <fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='URL of profile picture'
                    name='picture'
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='text'
                    placeholder='Your Name'
                    name='name'
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <textarea
                    className='form-control form-control-lg'
                    rows={8}
                    placeholder='Short bio about you'
                    name='bio'
                  ></textarea>
                </fieldset>
                <p>Email is always required when updating</p>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='text'
                    placeholder='Email'
                    name='email'
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='password'
                    placeholder='New Password'
                    name='password'
                  />
                </fieldset>
                <button className='btn btn-lg btn-primary pull-xs-right'>
                  {isPending ? 'Updating' : 'Update Settings'}
                </button>
              </fieldset>
            </form>
            <hr />
            <button className='btn btn-outline-danger' onClick={handleLogout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
