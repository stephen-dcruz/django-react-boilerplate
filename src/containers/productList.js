import axios from 'axios';
import React from 'react'
import { Button, Dimmer, Message, Loader, Segment, Container, Icon, Image, Item, Label } from 'semantic-ui-react'
import { productListURL } from '../constants'


class ProductList extends React.Component {

    state = {
        loading: false,
        error: null,
        data: []
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios.get(productListURL)
            .then(res => {
                console.log(res.data);
                this.setState({ data: res.data, loading: false });
            })
            .catch(err => {
                this.setState({ error: err });
            })
    }

    render() {
        const { data, error, loading } = this.state;
        return (
            <Container>
                {error && (
                    <Message
                        error
                        header='There was some errors with your submission'
                        content={JSON.stringify(error)}
                    />
                )}
                {loading && (
                    <Segment>
                        <Dimmer active inverted>
                            <Loader inverted>Loading</Loader>
                        </Dimmer>

                        <Image src='/images/wireframe/short-paragraph.png' />
                    </Segment>
                )}
                <Item.Group divided>
                    {data.map(item => {
                        return <Item key={item.id}>
                            <Item.Image src={item.image} />
                            <Item.Content>
                                <Item.Header as='a'>{item.title}</Item.Header>
                                <Item.Meta>
                                    <span className='cinema'>{item.category}</span>
                                </Item.Meta>
                                <Item.Description>{item.description}</Item.Description>
                                <Item.Extra>
                                    <Button primary floated='right' icon labelPosition='right'>
                                        Add to basket
            <Icon name='cart plus' />
                                    </Button>
                                    {item.discount_price && <Label color={item.label === 'primary' ? 'blue' : item.label === 'secondary' ? 'green' : 'olive'}>{item.label}</Label>}
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    })}

                </Item.Group>
            </Container>
        );
    }
}

export default ProductList