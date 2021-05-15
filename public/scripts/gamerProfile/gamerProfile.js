function showProfile(user)
{
    if(user){
        var uuser = JSON.stringify(user);
        console.log(uuser);
        sessionStorage.setItem("user", uuser);
        window.location.href = "http://localhost:4000/gamerProfile";
    }

}
function show()
{
    // console.log(user);
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user);
    document.getElementById("ign").innerHTML = user.ign;
    document.getElementById("name").innerHTML = user.firstName +" " + user.middleName + " "+ user.lastName;
    document.getElementById("email").innerHTML = user.useremail;
}
