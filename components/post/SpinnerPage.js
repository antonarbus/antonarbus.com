import PageWithComponentInTheMiddle from './PageWithComponentInTheMiddle'
import { Spinner } from './Spinner'

export default function SpinnerPage() {
  return (
    <PageWithComponentInTheMiddle component={<Spinner width="50px" color='#0083bfcc' />} />
  )
}
