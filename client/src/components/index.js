import React from 'react'
import { Link } from 'react-router-dom'
import Populate from './populate'
import AuthorIndex from './Author/index';

function index() {

    return (
        <div>
            <Link to="/authors/all">Go to authors</Link>

            <Populate />
        </div>
    )
}

export default index