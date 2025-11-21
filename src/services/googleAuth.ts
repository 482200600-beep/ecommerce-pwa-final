// Configuración de Google OAuth
export const GoogleConfig = {
  clientId: '12965070830-mjmnsh17fp13kr2471vjpnf46799jedt.apps.googleusercontent.com',
  scope: 'profile email'
};

// Inicializar Google Auth
export const initGoogleAuth = () => {
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
};

// Función para manejar el login
export const handleGoogleLogin = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('No hay ventana disponible'));
      return;
    }

    const client = (window as any).google?.accounts?.oauth2;
    if (!client) {
      reject(new Error('Google API no cargada'));
      return;
    }

    client.initTokenClient({
      client_id: GoogleConfig.clientId,
      scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
      callback: (response: any) => {
        if (response.access_token) {
          // Obtener información del usuario
          fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
            headers: {
              'Authorization': `Bearer ${response.access_token}`
            }
          })
          .then(res => res.json())
          .then(userInfo => resolve(userInfo))
          .catch(error => reject(error));
        } else {
          reject(new Error('Login fallido'));
        }
      }
    }).requestAccessToken();
  });
};
