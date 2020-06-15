import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    renderDish(dish) {
        if(dish) return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                            <CardBody>
                            <CardTitle>{this.props.dish.name}</CardTitle>
                            <CardText>{this.props.dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    {this.renderComments(dish.comments)}
                </div>
            </div>
        );
        return (
            <div></div>
        );
    }
    renderComments(comments) {
        const coms = comments.map((comment) => {
            return (
                <div className="container">
                    <li id={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author} , {(new Date(comment.date)).toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </li>
                </div>
            );
        });
        return (
            <div className="col-12 col-md-5 m1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {coms}
                </ul>
            </div>
        );
    }
    render() {
        return this.renderDish(this.props.dish);
    }
}

export default DishDetail;