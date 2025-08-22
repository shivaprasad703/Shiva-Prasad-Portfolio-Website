const ham=document.querySelector(".ham")
    const manu_bar=document.querySelector(".navbar-manu .manu-bar")

    ham.addEventListener("click",()=>{
        manu_bar .classList.toggle("show")
    })