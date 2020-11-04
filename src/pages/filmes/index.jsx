import React,{Component} from 'react';
import Menu from '../../components/menu';
import Jumbotron from '../../components/jumbotron'


class Filmes extends Component{

    constructor(){
        super();
    
        this.state = {
            url : 'https://5f95b38a2de5f50016ca222c.mockapi.io/api/filme',
            filmes : [],
            id : '',
            nome : '',
            categoria : '',
            anoLancamento : ''
        }
     }

    componentDidMount(){
        this.listar();
    }

    listar(){
        fetch(this.state.url,{
            method : 'GET'
       })
     
       .then(response => response.json())
       .then(dados => {
           this.setState({fimes : dados})
         console.log('filmes state' + this.state.filmes);
       })
       .catch(err => console.error(err));
    }

    remover(event){
        event.preventDefault();

        console.log(event.target.value);

        fetch(this.state.url + '/' + event.target.value, {
            method : 'DELETE'
          })
   
          .then(response => response.json)
          .then(dados => {
            alert('filme Removido');
            
   
            this.listar();
          })
   
          .catch(err => console.error(err));
    }

    editar(event){
        event.preventDefault();

        console.log(event.target.value);

        fetch(this.state.url + '/' + event.target.value, {
            method : 'PUT'
          })
   
          .then(response => response.json())
          .then(dado => {
            this.setState({id : dado.id});
            this.setState({nome : dado.nome});
            this.setState({categoria : dado.categoria});
            this.setState({anoLancamento : dado.anoLancamento});
          })
          .catch(err => console.error(err));
   
   
          this.listar();
    }

    setNome(event){
        event.preventDefault();

        this.setState({nome : event.target.value});

        console.log(event.target.value);
    }

    render(){
        return(
            <div>
                <Menu/>
                <Jumbotron titulo = "Filmes" descricao = "Gerencie seus Filmes"/>
                <div className="container">
        <div className="bd-example" >
        <form id="formFilme">
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input type="text" className="form-control" id="nome" value={this.state.nome} onChange={this.setNome.bind(this)} aria-describedby="nome" placeholder="Informe o Nome"/>
            </div>
            <div className="form-group">
              <label htmlFor="categoria">Categoria</label>
                <input type="text" className="form-control" id="categoria" value={this.state.categoria} placeholder="Informe a Categoria"/>
            </div>
            <div className="form-group">
                <label htmlFor="ano">Ano de Lançamento</label>
                <input type="text" className="form-control small" id="anoLancamento" value={this.state.anoLancamento} placeholder="Informe o Ano de Lançamento"/>
              </div>
              <button type="button"  className="btn btn-secondary">Cancelar</button>
            <button type="button"  className="btn btn-success">Salvar</button>
        </form>

        <table className="table" style={{margintop: '40px'}}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Categoria</th>
                <th scope="col">Ano Lançamento</th>
                <th scope="col">Ações</th>
                <th scope="col"><button type="reset" className="btn btn-primary">Novo Filme</button></th>
              </tr>
            </thead>
            <tbody id="tabela-lista-corpo">
                {
                    this.state.filmes.map(item =>{
                        return(
                        <tr key={item.id}>
                            
                            <td>{item.nome}</td>
                            <td>{item.categoria}</td>
                            <td>{item.anoLancamento}</td>
                            <td>
                                <button type = "button" className = "btn btn-danger" value={item.id} onClick={this.remover.bind(this)}> Remover </button>
                                <button type = "button" className = "btn btn-warning" value={item.id} onClick={this.editar.bind(this)} >Editar </button>  
                            </td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>
    </div>
            </div>
        )
    }
}

export default Filmes