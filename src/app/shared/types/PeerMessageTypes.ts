export type PeerMessageType = 
  | 'PLAYER_PROFILE' // retrieve player profile from opponent
  | 'SHARE_SEED' // host sends seed
  | 'GO_TO_MONSTER_SELECT' // send player to monster select screen
  | 'PICK_4_CONFIRMED' // when confirmed four monster selection
  | 'PICK_4_SELECTIONS' // send 4 monsters to opponents
  | 'TEAM_CONFIRMED' // when confirmed team of 3
  | 'START_GAME' // starts online game
  | 'SUBMIT_ACTION' // when action is confirmed
  | 'SEND_SELECTED_ACTION' // sends selected action after both players have confirmed
  | 'ACKNOWLEDGE_DIALOG' // acknowledge dialog
  | 'FINISHED_TURN' // signifies opponent has finished resolving the turn

  // from prompts
  | 'CRUSH_PROMPT'
  | 'DISABLE_ACTION_PROMPT'
  | 'KNOCKED_OUT_SWITCH_IN_PROMPT'
  | 'SWITCH_OUT_PROMPT'
  | ''