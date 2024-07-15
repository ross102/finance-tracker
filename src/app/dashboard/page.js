import { Suspense } from "react"
import TransactionList from './components/transaction-list';
import TransactionSummaryItem from '@/components/transaction-summary';
import Button from '@/components/button';
import Label from '@/components/label';
import Input from '@/components/input';
import Select from '@/components/select';
import Separator from '@/components/seperator';
import Skeleton from '@/components/skeleton';
import Link from 'next/link'
import {PlusCircle} from 'lucide-react'
import { sizes, variants } from "@/lib/variants"
import Loading from "./loading";
import Trend from "./components/trend"
import TrendFallback from "./components/trend-fallback";
import { createClient } from "@/lib/supabase/server"
import { ErrorBoundary } from "react-error-boundary";
import { types } from "@/lib/consts"

export default function Page() {
    
    const client = createClient();

    return (<>
    <section className="mb-8">
      <h1 className="text-4xl font-semibold">Summary</h1>
    </section>

      <div>
        <h2 className="mb-4 text-lg font-mono">Trend</h2>
        <Separator />
        <div className="flex space-x-8">
        {types.map(type => <ErrorBoundary key={type} fallback={<div className="text-red-500">Cannot fetch {type} trend data</div>}>
        <Suspense fallback={<TrendFallback />}>
          <Trend type={type} />
        </Suspense>
      </ErrorBoundary>)}
        </div>

      </div>
     
      <div>
       
        <Separator />
        
        <div className="space-y-4"> 
        <section className="flex justify-between items-center mb-8">
      <h2 className="text-2xl">Transactions</h2>
      <Link href="/dashboard/transaction/add" className={`flex items-center space-x-1 ${variants['outline']} ${sizes['sm']}`}>
        <PlusCircle className="w-4 h-4" />
        <div>Add</div>
      </Link>
    </section>

        <Suspense fallback={<Loading />}>
           <TransactionList />
         </Suspense>      
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-lg font-mono">Buttons</h2>
        <Separator />
        <div className="space-x-4">
          <Button>Hello</Button>
          <Button variant="outline">Hello</Button>
          <Button variant="ghost">Hello</Button>

          <Button size="xs">Hello</Button>
          <Button size="sm">Hello</Button>
          <Button size="lg">Hello</Button>
        </div>
      </div>
      <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div>
          <Label className="mb-1">Your name</Label>
          <Input type="text" placeholder="Type something in here..." />
          </div>
          <div>
          <Label className="mb-1">City</Label>
            <Select>
              <option>Warsaw</option>
              <option>Berlin</option>
              <option>London</option>
            </Select>
          </div>
          <div className="flex items-center">
          <Input type="checkbox" id="terms" />
          <Label className="ml-2" htmlFor="terms">Accept terms</Label>
          </div>
      </div>
      <div className="space-y-8">
          <div className="flex space-x-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>

          <div className="space-y-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
    </>)
  }
