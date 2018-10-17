import React from 'react'

const ChannelParticipants = ({
  channel: { participants, writers, owner },
  isOwner,
  giveWriteAccess,
  revokeWriteAccess,
  user
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">{participants.length} Online</p>

      {participants.map(par => {
        const participantIsOwner = par.username === owner.username
        const participantIsWriter = writers.some(
          wr => wr.username === par.username
        )

        return (
          <div className="panel-block" key={par.id}>
            <span className="panel-icon">
              <i className="fas fa-code-branch" aria-hidden="true" />
            </span>
            {par.username}
            {participantIsWriter && (
              <span className="tag is-primary" style={{ marginLeft: '1rem' }}>
                Write Access
              </span>
            )}
            {participantIsOwner && (
              <span className="tag is-link" style={{ marginLeft: '1rem' }}>
                Owner
              </span>
            )}
            {par.id == user.id && (
              <span className="tag is-danger" style={{ marginLeft: '1rem' }}>
                You
              </span>
            )}
            {isOwner &&
              !participantIsOwner && (
                <div className="is-pulled-right" style={{ paddingLeft: '40%' }}>
                  {participantIsWriter ? (
                    <button
                      className="button is-danger is-outlined is-pulled-right"
                      onClick={() => revokeWriteAccess(par.username)}
                    >
                      Revoke Write Access
                    </button>
                  ) : (
                    <button
                      className="button is-primary is-outlined is-pulled-right"
                      onClick={() => giveWriteAccess(par.username)}
                    >
                      Give Write Access
                    </button>
                  )}
                </div>
              )}
          </div>
        )
      })}
    </nav>
  )
}

export default ChannelParticipants
