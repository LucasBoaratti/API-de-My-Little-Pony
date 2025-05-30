import { useState } from "react";
import Unicornio from "../assets/Pony.jfif";
import css from "./PonyAPI.module.css";
import axios from "axios";

export function PonyAPI() {
     const [id, setId] = useState("");
     const [pony, setPony] = useState(null);
     const [erro, setErro] = useState(null);

     async function ObterUnicornio() {
          if (!id || parseInt(id) <= 0) {
               setErro("Insira um ID válido (Maior que zero).");
               setPony(null);
               return;
          }
          try {
               const response = await axios.get(`http://ponyapi.net/v1/character/${id}`)
     
               setPony(response.data);

               setErro(null);
          }

          catch(error) {
               setErro("Pony não encontrado :(");
               setPony(null);
          }
     }

     return (
          <main>
               <section className={css.container}>
                    <div className={css.api}>
                         <div className={css.apiInformacoes}>
                              <h1>🦄 API do My Little Pony 🦄</h1>
                              <div className={css.imagem}>
                                   <img src={Unicornio} alt="Imagem de uma pokedex" />
                              </div>
                              <label htmlFor="pony" style={{ fontSize:"16px" }}>Digite o ID do Pony:</label> <br />
                              <input type="number" name="pony" id="idPony" value={id} onChange={(e) => setId(e.target.value)} min="1"/> <br />
                              <div className={css.botao}>
                                   <button type="button" onClick={ObterUnicornio}>Buscar</button>
                              </div>
                              {erro && <p>{erro}</p>}
                              {pony && (
                                   <div className={css.informacoes}>
                                        <table>
                                             <thead>
                                                  <tr>
                                                       <th>Nome</th>
                                                       <th>Apelido</th>
                                                       <th>Sexo</th>
                                                       <th>Onde mora</th>
                                                       <th>Ocupação</th>
                                                       <th>Tipo</th>
                                                  </tr>
                                             </thead>
                                             <tbody> 
                                                  <tr>
                                                       <td>{pony.data[0].name}</td>
                                                       <td>{pony.data[0].alias}</td>
                                                       <td>{pony.data[0].sex}</td>
                                                       <td>{pony.data[0].residence}</td>
                                                       <td>{pony.data[0].occupation}</td>
                                                       <td>{pony.data[0].kind?.join(", ")}</td>
                                                  </tr>
                                             </tbody>
                                        </table>
                                        <div className={css.imagemPony}>
                                             <h2>Foto</h2>
                                             <img src={pony.data[0].image[0]} alt="Imagem do pony" />
                                        </div>
                                   </div>
                              )}
                         </div>
                    </div>
               </section>
          </main>
     )
}