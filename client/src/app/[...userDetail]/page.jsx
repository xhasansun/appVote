'use client';
import React, { useState, useEffect } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useParams } from 'next/navigation'
import { gql, useQuery } from '@apollo/client'

const UserDetail = () => {

  const params = useParams()
  const userID = params.userDetail[1];
  const [user, setUser] = useState(null);

  const USER = gql`
    query {
      user(id: "${userID}") {
        id
        name
        position
        image
      }
    }
  `
  const { loading, error, data } = useQuery(USER)

  useEffect(() => {
    if (data) {
      setUser(data.user)
    }
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const header = (
    <img alt="Card" src={`https://i.pravatar.cc/150?img=${user?.image}`} />
  );

  return (
    <div className="card flex justify-content-center">
      <Card title={user?.name} subTitle={user?.position} header={header} className="md:w-25rem">
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
          numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
        </p>
      </Card>
    </div>
  )
}

export default UserDetail