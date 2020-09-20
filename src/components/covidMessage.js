import React from "react"
import { Message } from "semantic-ui-react"

const CovidMessage = () => (
  <Message negative>
    <Message.Header>
      Due to rapidly changing circumstances resulting from COVID-19, happy hours
      are not guaranteed to be accurate. Please call prior to your visit to
      confirm specials.
    </Message.Header>
  </Message>
)

export default CovidMessage
