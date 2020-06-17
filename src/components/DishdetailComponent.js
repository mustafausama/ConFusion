import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({dish}) {
    if(dish) return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
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
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/home">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to="/menu">Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.comments} />
            </div>
        </div>
    );
}

export default DishDetail;