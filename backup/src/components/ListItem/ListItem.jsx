import './ListItem.scss'
import {PlayArrow, Add} from "@material-ui/icons"

const ListItem = ({toggleShow}) => {
    return(
        <div 
            onClick = {() => {toggleShow()}} 
            className="listItem">
            <img alt="" src="https://lumiere-a.akamaihd.net/v1/images/p_rayaandthelastdragon_21294_83346778.jpeg"/>
            <div className="itemInfo">
                <div>
                    <h3>1977</h3>
                    <p>1h 25m</p>
                </div>
                <div className="btn-play">
                    <PlayArrow/>
                </div>
                <Add/>
            </div>
        </div>
    )
}

export default ListItem