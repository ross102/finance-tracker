import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { faker } from '@faker-js/faker'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.SUPABASE_SERVICE_ROLE,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const categories = [
  'Housing', 'Transport', 'Health', 'Food', 'Education', 'Other'
]

async function seed() {
  let transactions = [];
  let id= 0;

  for (let i = 0; i < 10; i++) {
    const created_at = faker.date.past()
    let type, category = null

    const typeBias = Math.random()

    if (typeBias < 0.80) {
      type = 'Expense'
      category = faker.helpers.arrayElement(
        categories
      )
    } else if (typeBias < 0.90) {
      type = 'Income'
    } else {
      type = faker.helpers.arrayElement([
        'Saving', 'Investment'
      ])
    }

    let amount
    switch (type) {
      case 'Income':
        amount = faker.number.int({
          min: 2000,
          max: 9000
        })
        break
      case 'Expense':
        amount = faker.number.int({
          min: 10,
          max: 1000
        })
        break
      case 'Investment':
      case 'Saving':
        amount = faker.number.int({
          min: 3000,
          max: 10000
        })
        break
    }
    id++;
    transactions.push({
    //   id,
      created_at,
      amount,
      type,
      description: faker.lorem.sentence(),
      category,
    })
  }
 
  console.log(transactions);
  const { error } = await supabase.from('transactions')
    .insert(transactions)

  if (error) {
    console.log(error);

    console.error('Error inserting data')
  } else {
    console.log('Data inserted')
  }
}

seed().catch(console.error)