export default defineNuxtRouteMiddleware(async (to, from) => {
    const { data } = useAuthState();
    
    if (!data.value) {
      // User is not authenticated, redirect to login
      return navigateTo('/login');
    }
  
    const userRole = data.value.role;
    const requiredRole = to.meta.role;

  
    if (requiredRole && userRole !== requiredRole) {
      // User does not have the required role, redirect or show error
      return navigateTo('/unauthorized'); // Create an unauthorized page if you don't have one
    }
  });