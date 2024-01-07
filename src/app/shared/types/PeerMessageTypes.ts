export type PeerMessageType = 
  // when connecting players
  | 'PLAYER_PROFILE' // retrieve player profile from opponent
  | 'SHARE_SEED' // host sends seed

  // selecting monsters screen
  | 'GO_TO_MONSTER_SELECT' // send player to monster select screen
  | 'PICK_4_CONFIRMED' // when confirmed four monster selection
  | 'PICK_4_SELECTIONS' // send 4 monsters to opponents
  | 'TEAM_CONFIRMED' // when confirmed team of 3
  | 'START_GAME' // starts online game
  
  | 'TEST_GAME' // starts with card-coded presets - for testing

  // battle screen
  | 'SUBMIT_ACTION' // when action is confirmed
  | 'SEND_SELECTED_ACTION' // sends selected action after both players have confirmed
  | 'ACKNOWLEDGE_DIALOG' // acknowledge dialog
  | 'FINISHED_TURN' // signifies opponent has finished resolving the turn

  // game over screen
  | 'GO_TO_PICK_3'
  | 'REPLAY_GAME'


  // from prompts
  | 'CRUSH_PROMPT'
  | 'DISABLE_ACTION_PROMPT'
  | 'KNOCKED_OUT_SWITCH_IN_PROMPT'
  | 'SWITCH_OUT_PROMPT'
  | ''