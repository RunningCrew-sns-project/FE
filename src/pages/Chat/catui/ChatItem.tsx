

const ChatItem = ({message}) => {
  return(
    <> 
      <div className="">
        <div className={`
          ${message.isSentByUser === 'send' ? '' : '' }
        `
        }>
          {message.type === 'text' && <div> {message.message}</div>}
          {message.type === 'imgage' && <div> {message.message}</div>}
        </div>
        <span></span>
      </div>
    </>
  )
}

export default ChatItem