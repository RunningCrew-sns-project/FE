

const ChatItem = ({message}) => {
  return(
    <> 
      <div className="">
        <div className={`
          ${message.isSentByUser === 'send' ? '' : '' }
        `
        }>
          {/* 메세지가 이미지일경우 처리  */}
          {message.type === 'text' && <div> {message.message}</div>}
          {message.type === 'imgage' && <div> {message.message}</div>}
        </div>
        <span></span>
      </div>
    </>
  )
}

export default ChatItem