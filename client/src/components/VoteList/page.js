'use client'
import React, { useEffect } from 'react'
import PersonCard from './personCard'
import { VoteListStyled } from './styled/main.styled'
import { gql, useQuery } from '@apollo/client'
import logger from '@/helpers/logger'
import Loading from '../Loading/page'
import Error from '../Error/page'
const USERS = gql`
query GetUsers {
  users {
    id
    age
    email
    image
    name
    position
    rating
    skills
  }
}
`

const Votelist = () => {
  useEffect(() => {
    logger.debug('VoteList mounted');
  }, []);

  const { loading, error, data } = useQuery(USERS)

  if (loading) return <Loading />
  if (error) return <Error />

  const allUsers = data.users

  const getDataFromLocalStorage = JSON.parse(localStorage.getItem('users'))

  if (!getDataFromLocalStorage){
    localStorage.setItem('users', JSON.stringify(allUsers))
  }

  return (
    <div>
      <VoteListStyled className='voteList'>
        <PersonCard data={allUsers} />
      </VoteListStyled>

    </div>
  )
}

export default Votelist