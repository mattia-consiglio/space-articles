import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Article } from "../interfaces/NewsList";
import { useNavigate } from "react-router-dom";

export const CardNews = ({ news }: { news: Article }) => {
	const navigate = useNavigate();

	return (
		<article>
			<Col xs={12}>
				<Card>
					<Row>
						<Col md={4}>
							<Card.Img variant="top" src={news.image_url} />
						</Col>
						<Col mg={6}>
							<Card.Body>
								<Card.Title>{news.title} </Card.Title>
								<Card.Text>{news.summary}</Card.Text>
								<Button
									variant="primary"
									onClick={() => {
										navigate("/" + news.id);
									}}
								>
									Read all
								</Button>
							</Card.Body>
						</Col>
					</Row>
				</Card>
			</Col>
		</article>
	);
};
