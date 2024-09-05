import { HttpInterceptorFn } from '@angular/common/http';


export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const headersConfig = {};
  const myToken = localStorage.getItem('token');
  if(myToken!=null){
    const cloneRequest = req.clone({
      setHeaders:{
        Authorization: `Bearer ${myToken}`
      }
    })
    return next(cloneRequest);
  }
  const cloneRequest = req.clone({ setHeaders: headersConfig });
  return next(cloneRequest);
};
