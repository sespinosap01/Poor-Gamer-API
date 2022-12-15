function guardarFav(id) {
    if (localStorage.getItem("fav") == undefined) {
        localStorage.setItem("fav", id)
    } else {
        let favCreado = localStorage.getItem("fav").split("-")
        let creado = false

        for (let i = 0; i < favCreado.length; i++) {
            if (favCreado[i] == id) {
                creado = true;
            }
        }
        if (creado) {
            let favBorrado = "";
            for (let i = 0; i < favCreado.length; i++) {
                if (favCreado[i] == id) {} else {
                    if (i == 0) {
                        favBorrado = favCreado[i]
                    } else {
                        favBorrado = favBorrado + "-" + favCreado[i]
                    }
                }
            }
            localStorage.setItem("fav", favBorrado)

            if (favCreado.length == 1) {
                localStorage.removeItem("fav")
            }
            location.reload()
        } else {
            localStorage.setItem("fav", localStorage.getItem("fav") + "-" + id)
        }
    }
}