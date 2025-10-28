import { Code, H, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'github',
  date: '2025.10.28',
  tags: ['tools'],
  desc: 'GitHub',
  body: (
    <>
      <H>Search queries in web interface</H>

      <p>General Syntax</p>

      <ul>
        <li>{'org:ORGANIZATION | repo:OWNER/REPO | user:USERNAME'}</li>
        <li>{'author: USERNAME | assignee:USERNAME | commenter:USERNAME'}</li>
        <li>{'is:pr | is:issue | is:merged | is:open | is:closed'}</li>
        <li>{'created:YYYY-MM-DD..YYYY-MM-DD | updated:>=YYYY-MM-DD'}</li>
        <li>{'label:"some label"'}</li>
        <li>{'sort:updated-desc | sort:created-asc'}</li>
      </ul>

      <table border="1" cellpadding="6" cellspacing="0">
        <thead>
          <tr>
            <th>Purpose</th>
            <th>Example Query</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>All PRs by a user in org</td>
            <td>
              <code>org:COMPANY author:NAME is:pr</code>
            </td>
            <td>Shows all PRs created by AME</td>
          </tr>
          <tr>
            <td>Only merged PRs</td>
            <td>
              <code>org:COMPANY author:NAME is:pr is:merged</code>
            </td>
            <td>Only those actually merged</td>
          </tr>
          <tr>
            <td>Only open PRs</td>
            <td>
              <code>repo:COMPANY/REPO author:NAME is:open is:pr</code>
            </td>
            <td>Still active</td>
          </tr>
          <tr>
            <td>Closed but not merged PRs</td>
            <td>
              <code>is:pr is:closed -is:merged author:NAME</code>
            </td>
            <td>Useful for declined PRs</td>
          </tr>
          <tr>
            <td>PRs created this year</td>
            <td>
              <code>org:COMPANY author:NAME is:pr created:&gt;=2025-01-01</code>
            </td>
            <td>Uses date range</td>
          </tr>
          <tr>
            <td>PRs in a specific date range</td>
            <td>
              <code>repo:COMPANY/backend is:pr author:NAME created:2024-06-01..2024-12-31</code>
            </td>
            <td>Two-dot range syntax</td>
          </tr>
          <tr>
            <td>Recently updated PRs</td>
            <td>
              <code>org:COMPANY author:NAME is:pr updated:&gt;=2025-10-01 sort:updated-desc</code>
            </td>
            <td>Sort newest first</td>
          </tr>
          <tr>
            <td>PRs mentioning a keyword</td>
            <td>
              <code>org:COMPANY is:pr author:NAME "lambda migration"</code>
            </td>
            <td>Full-text match in title/body</td>
          </tr>
          <tr>
            <td>PRs assigned to someone</td>
            <td>
              <code>repo:COMPANY/REPO is:pr assignee:NAME</code>
            </td>
            <td>Useful for reviews</td>
          </tr>
          <tr>
            <td>PRs reviewed by user</td>
            <td>
              <code>org:COMPANY reviewed-by:NAME is:pr</code>
            </td>
            <td>When you were a reviewer</td>
          </tr>
          <tr>
            <td>PRs requesting your review</td>
            <td>
              <code>org:COMPANY review-requested:NAME is:pr</code>
            </td>
            <td>Pending review requests</td>
          </tr>
          <tr>
            <td>PRs merged by someone</td>
            <td>
              <code>org:COMPANY merged-by:NAME is:pr is:merged</code>
            </td>
            <td>Who merged them</td>
          </tr>
          <tr>
            <td>PRs targeting a branch</td>
            <td>
              <code>repo:COMPANY/backend is:pr base:main</code>
            </td>
            <td>Target branch</td>
          </tr>
          <tr>
            <td>PRs touching specific path</td>
            <td>
              <code>repo:COMPANY/backend is:pr path:src/lambda/</code>
            </td>
            <td>Code in that path changed</td>
          </tr>
        </tbody>
      </table>

      <p>Useful Search Prompts for Commits</p>

      <table border="1" cellpadding="6" cellspacing="0">
        <thead>
          <tr>
            <th>Purpose</th>
            <th>Example Query</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Commits by author</td>
            <td>
              <code>repo:COMPANY/backend author:NAME</code>
            </td>
            <td>Simple one</td>
          </tr>
          <tr>
            <td>Commits across org</td>
            <td>
              <code>org:COMPANY author:NAME</code>
            </td>
            <td>Works across repos</td>
          </tr>
          <tr>
            <td>Commits after certain date</td>
            <td>
              <code>repo:COMPANY/backend author:NAME committer-date:&gt;=2025-01-01</code>
            </td>
            <td>Filter by commit date</td>
          </tr>
          <tr>
            <td>Commits between dates</td>
            <td>
              <code>repo:COMPANY/backend author:NAME committer-date:2024-05-01..2024-12-31</code>
            </td>
            <td>Specific range</td>
          </tr>
          <tr>
            <td>Commits mentioning keyword</td>
            <td>
              <code>org:COMPANY author:NAME "zod migration"</code>
            </td>
            <td>Matches message text</td>
          </tr>
          <tr>
            <td>Commits in specific path</td>
            <td>
              <code>repo:COMPANY/backend path:src/api/ author:NAME</code>
            </td>
            <td>Filter by directory</td>
          </tr>
          <tr>
            <td>Commits by email</td>
            <td>
              <code>repo:COMPANY/backend committer-email:NAME@COMPANY.com</code>
            </td>
            <td>Fallback when username differs</td>
          </tr>
          <tr>
            <td>Newest first</td>
            <td>
              <code>sort:committer-date-desc</code>
            </td>
            <td>Sort commits by date</td>
          </tr>
        </tbody>
      </table>

      <p>Date Range Syntax</p>

      <table border="1" cellpadding="6" cellspacing="0">
        <thead>
          <tr>
            <th>Syntax</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>created:&gt;=2025-01-01</code>
            </td>
            <td>from Jan 1 2025 onward</td>
          </tr>
          <tr>
            <td>
              <code>created:&lt;=2025-06-30</code>
            </td>
            <td>until June 30 2025</td>
          </tr>
          <tr>
            <td>
              <code>created:2025-01-01..2025-06-30</code>
            </td>
            <td>between those dates</td>
          </tr>
          <tr>
            <td>
              <code>updated:&gt;2025-10-01</code>
            </td>
            <td>updated after Oct 1 2025</td>
          </tr>
          <tr>
            <td>
              <code>committer-date:2025-01-01..2025-10-28</code>
            </td>
            <td>for commit searches</td>
          </tr>
        </tbody>
      </table>

      <h3>Combine Filters</h3>

      <ul>
        <li>{'org:COMPANY author:NAME is:pr is:merged created:>=2025-01-01 "zod"'}</li>
      </ul>

      <p>Tips</p>

      <ul>
        <li>
          Use <code>is:merged</code> instead of <code>is:closed</code> when you only care about
          integrated work.
        </li>
        <li>
          Combine with <code>sort:</code> keywords such as <code>sort:created-desc</code> or{' '}
          <code>sort:updated-desc</code>.
        </li>
        <li>
          Use <code>review:approved</code>, <code>review:changes_requested</code>, or{' '}
          <code>draft:true</code> to filter PRs by state.
        </li>
        <li>You can click “Save search” in GitHub UI to bookmark filters.</li>
      </ul>
    </>
  )
}

export default postObj

export const post = {
  title: postObj.title,
  date: postObj.date,
  tags: postObj.tags,
  desc: postObj.desc,
  imgUrl: postObj.imgUrl || null,
  bodyStr: jsxToStr(postObj.body)
}
