import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


function RenderDish({dish}) {
    if(dish) return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <RenderComments comments={dish.comments} />
            </div>
        </div>
    );
    return (
        <div></div>
    );
}

function RenderComments({comments}) {
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
const DishDetail = (props) => {
    return <RenderDish dish={props.dish} />;
}

export default DishDetail;