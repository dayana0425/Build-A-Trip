import React from 'react';
import { InputGroup, InputGroupAddon, Button, Input, Table} from 'reactstrap';

const buttonStyle = {
    marginBottom: 10
}

const Example = () => {
    return (
        <div>
            <InputGroup>
                <Input />
                <InputGroupAddon addonType="append">
                    <Button color="primary" style = {buttonStyle}>Search</Button>
                </InputGroupAddon>
            </InputGroup>
            <Table hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </Table>
        </div>

    );
};

export default Example;