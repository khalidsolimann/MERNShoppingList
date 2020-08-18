import React from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends React.Component {

    componentDidMount() {
        this.props.getItems();
    }

    handleDelete = (id) => {
        this.props.deleteItem(id);
    }

    render() {
        //console.log(this.props);
        const  {items}  = this.props.item;
        return (
            <Container>
                
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name }) => {
                            return(
                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={this.handleDelete.bind(this, _id)}
                                    >&times;</Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>)
                        })}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    deleteItem: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
   return {
       item: state.item
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getItems: () => dispatch(getItems()),
        deleteItem: (id) => dispatch(deleteItem(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);