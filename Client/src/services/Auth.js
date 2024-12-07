export function isAuthenticated(){
    let user = JSON.parse(localStorage.getItem('clinicInfo'))
    if(user===null){
        window.location.href='http://localhost:3000/clinic'
    }
}