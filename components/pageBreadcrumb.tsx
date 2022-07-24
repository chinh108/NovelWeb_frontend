import Link from 'next/link'
import React from 'react'
import { Container } from 'reactstrap'
import { Home, ChevronRight } from 'react-feather'

function PageBreadcrumb({ name, link }: any) {
  return (
    <Container>
      <div className="page-breadcrumb">
        <span className="breadcrum-level">
          <Link href="/">
            <Home size={20} />
          </Link>
        </span>
        <span className="next-icon">
          <ChevronRight size={20} />
        </span>
        <span className="breadcrum-level">
          <Link href={link}>{name}</Link>
        </span>
      </div>
    </Container>
  )
}

export default PageBreadcrumb