
            //GET listar livros
            let listarautores = document.getElementById("listar-autores")
            let listarlivros = document.getElementById("listar-livros")
            let btn = document.getElementById("btn")
            const API = "https://livros.acilab.com.br/api/livros";
            function listarLivros() {
                fetch(API, { method: "GET" })

                    .then(response => response.json())
                    .then(data => {
                        listarlivros.innerHTML = ""
                        listarautores.innerHTML = ""
                        for (let i = 0; i < data.length; i++) {

                            listarautores.innerHTML += `${data[i].autor} <br>`
                            listarlivros.innerHTML += `${data[i].titulo} 
                        <button onclick= 'excluirLivro(${data[i].id})'>X</button>
                       <input type="button" value="Editar" onclick="Editarlivros('${data[i].id}', '${data[i].titulo}', '${data[i].autor}')">
                        <br>`

                        }

                        console.log(data)
                    })
            }
          if (btn) {
                    btn.addEventListener("click", () => {
                        listarLivros()
                    })
                }
            //DELETE excluir livro
            function excluirLivro(id) {
                if (confirm("Deseja realmente excluir este livro?")) {
                    fetch(`${API}/${id}`, {
                        method: "DELETE"
                    })
                        .then(response => {
                            if (response.ok) {
                                listarLivros();
                            } else {
                                alert("Erro ao excluir o livro.");
                            }
                        })
                        .catch(error => console.error("Erro na exclusão:", error));
                }
            }

            //PUT editar livro
            function Editarlivros(id, titulo, autor) {
                // Abre caixas de texto pré-preenchidas com os valores atuais
                const novotitulo = prompt("Digite o novo título:", titulo);
                const novoautor = prompt("Digite o novo autor:", autor);

                // Verifica se o usuário preencheu e não cancelou
                if (novotitulo && novoautor) {
                    fetch(`${API}/${id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id: id,
                            titulo: novotitulo,
                            autor: novoautor
                        })
                    })
                        .then(response => {
                            if (response.ok) {
                                listarLivros(); // Atualiza a lista na tela
                            } else {
                                alert("Erro ao editar o livro");
                            }
                        })
                        .catch(error => console.error("Erro na edição", error));
                }
            }

   
            
 
    //POST adicionar livro
    function adicionarLivro(titulo, autor) {
        fetch(API, {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({titulo, autor})
        })
        .then(response=> response.json())
        .then(data => {
            console.log(data)
        })
    }

    //Listerns
const btnListar = document.getElementById("btn")
    if (btnListar) {
        btnListar.addEventListener("click", listarLivros)
    }

    const btnEnviar = document.getElementById("btnEnviar")
    if (btnEnviar) {
        btnEnviar.addEventListener("click", () => {
            const txtTitulo = document.getElementById("titulo").value.trim()
            const txtAutor = document.getElementById("autor").value.trim()

            if (txtTitulo === "" || txtAutor === "") {
                alert("Por favor, preencha todos os campos.")
                return
            }
            adicionarLivro(txtTitulo, txtAutor)
        })
}
   
   