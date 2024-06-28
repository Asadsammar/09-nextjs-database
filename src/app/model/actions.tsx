import { signIn } from '../../../auth';

type AuthError = {
  type: 'CredentialsSignin' | string;
  message: string;
};

function isAuthError(error: unknown): error is AuthError {
  return (error as AuthError).type !== undefined;
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (isAuthError(error)) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    } else if (error instanceof Error) {
      // Handle other types of errors if necessary
      return `Unexpected error: ${error.message}`;
    }
    throw error;
  }
}
