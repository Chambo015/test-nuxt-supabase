export interface Invoice {
  id: number
  user_id: number
  course_id: number
  price: "string"
  is_purchased: boolean
  is_ib: boolean | null
  is_group: boolean | null
  group: GroupIS | null
  user_count: number | null
  /** Total Price */
  total_sum: "string"
}

export interface GroupIS {
  id: number
  course_id: number
  course_name: string
  created_user_id: number
  invoice_id: number
  is_payed?: boolean
  user_count: number | null
  price: number | string | null
  created_at?: string
  total_user_count: number | null
  accepted_user_count?: number
  finished_user_count?: number
}

export interface ParticipantOfGroupIS {
  id: number
  /** Id of GroupIS */
  ib_group_id: number
  email: null | string
  user_name: string | null
  /** Принял ли юзер приглашения в группу  */
  is_accepted: boolean
  /** Закончил ли обучение */
  is_finished: boolean
}
