import React,{Component} from 'react';
import Menu from '../../components/menu';


class Filmes extends Component{
    render(){
        return(
            <div>
                <Menu/>
                <h1>Filmes</h1>
                <p>Gerencie seus filmes</p>
            </div>
        )
    }
}

export default Filmes