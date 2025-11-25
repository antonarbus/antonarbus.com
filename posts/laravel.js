'use client'


import { Code, H, Hs, LazyImg, Lnk, jsxToStr } from '/components/post/reExport'

const postObj = {
  title: 'laravel',
  date: '2022.01.12',
  tags: ['php'],
  imgUrl: 'https://antonarbus.com/imgs/laravel.png',
  desc: 'laravel basics',
  body: (
    <>
      <p>
        <Lnk path='https://laravel.com/'>Laravel</Lnk> is a php framework.
      </p>

      <H>Windows installation</H>

      <ol>
        <li>Install <Lnk path='https://www.apachefriends.org/index.html'>XAMPP</Lnk></li>
        <li>Install <Lnk path='https://getcomposer.org/download/'>Composer</Lnk></li>
        <li>With terminal go to <code>cd /C/xampp/htdocs</code></li>
        <li>From terminal within a folder install laravel package <code>composer create-project laravel/laravel laravelApp</code> </li>
        <li>Go to the project folder <code>cd laravelApp</code> </li>
        <li>Open it with VSCode <code>. code</code></li>
        <li>Start Apache server from XAMPP software</li>
        <li>Project is served from <a href="http://localhost/laravelApp/public/index.php">http://localhost/laravelApp/public/index.php</a></li>
      </ol>

      <Hs>Virtual host (optional)</Hs>

      <p>
        We can swap long project url <a href="http://localhost/laravelApp/public/index.php">http://localhost/laravelApp/public/index.php</a> with a short domain name <a href="http://laravelApp.test">http://laravelApp.test</a>
      </p>
      <p>
        Add virtual host configuration into <code>C:\xampp\apache\conf\extra\httpd-vhosts.conf</code> file
      </p>
      <Code block none>{`
        <VirtualHost *:80>
          DocumentRoot "C:/xampp/htdocs/laravelApp/public"
          ServerName laravelapp.dev
        </VirtualHost>
      `}</Code>

      <p>
        Modify <code>C:\Windows\System32\drivers\etc\hosts</code> file as administrator by adding following & restart Apache.
      </p>

      <Code block none>{`
        127.0.0.1 localhost
        127.0.0.1 laravelapp.test
      `}</Code>

      <H>MVC</H>

      <p>Laravel is based on the MVC architecture, where</p>

      <ul>
        <li><i>Model</i> takes care of database. Models go into <code>app</code> folder.</li>
        <li><i>View</i> is responsible for UI</li>
        <li><i>Controller</i> handles requests</li>
      </ul>

      <p>Files are distributed as on the picture</p>

      <LazyImg src='../imgs/laravel/folderStructure.png' height={571} width={394} />

      <H>View from route</H>

      <p>We can return text, html, page for a GET request directly from a <code>routes/web.php</code></p>

      <LazyImg src='../imgs/laravel/viewFromRoute.png' />

      <p>HTML string is returned.</p>

      <LazyImg src='../imgs/laravel/viewFromRoutOutput2.png' />

      <p>HTML file is returned.</p>

      <LazyImg src='../imgs/laravel/aboutBlade.png' />

      <LazyImg src='../imgs/laravel/viewFromRoutOutput3.png' />

      <p>Data can be passed via url.</p>

      <LazyImg src='../imgs/laravel/viewFromRoutOutput1.png' />

      <H>View from controller</H>

      <p>We usually do not want to return a <i>view</i> from a <i>route</i></p>

      <p>Normal way is that a route goes to a <i>controller</i> function, which returns a <i>view</i></p>

      <Hs>Artisan</Hs>

      <p>The easiest way to create a <i>controller</i> is to use <i>artisan</i> command like <code>php artisan make:controller PagesController</code></p>

      <p><code>PagesController.php</code> file has been created and we return views via functions, one with a text, another with a page.</p>

      <LazyImg src='../imgs/laravel/artisanCreateController.png' />

      <p>Do not forget to add routes to controllers with following pattern.</p>

      <LazyImg src='../imgs/laravel/routesToControllers.png' />

      <H>Post request</H>

      <p>POST, PUT & DELETE requests are done similar way as GET.</p>

      <p>May require disabling CSRF verification.</p>

      <LazyImg src='../imgs/laravel/postRequest.png' />

      <H>Blade templating</H>

      <p>Note how we dynamically inserted {'<title>'} into page from <code>.env</code> file.</p>

      <LazyImg src='../imgs/laravel/fromEnvFileToTemplate.png' />

      <LazyImg src='../imgs/laravel/envFileDataInTitle.png' />

      <Hs>Layouts</Hs>

      <p>If we have pages with repetitive blocks, we may create a layout template and avoid repeating ourselves.</p>

      <p>To make templating easier we may install <Lnk path='https://marketplace.visualstudio.com/items?itemName=onecentlin.laravel-blade'>blade snippets</Lnk> for syntax highlighting.</p>

      <LazyImg src='../imgs/laravel/layout.png' />

      <H>Pass value</H>

      <Hs>Pass single value</Hs>

      <LazyImg src='../imgs/laravel/passValueToView.png' />

      <Hs>Pass multiple values in associative or indexed array</Hs>

      <LazyImg src='../imgs/laravel/passArrayIntoView.png' />

      <Code block php>{`
      // controller
      public function page3() {
        $data = array(
          'title' => 'TITLE',
          'items' => ['ITEM-01', 'ITEM-02', 'ITEM-03']
        );
        return view('pages.page3', [
          'data' => $data, 
          'title' => $data['title'], 
          'items' => $data['items']
        ]);
      }
      `}</Code>

      <Code block php>{`
      // view
      @extends('layouts.layout')
      @section('content')
        <p><?php var_dump($data); ?></p>

        <p>Purely with php</p>
        <H><?php echo $title;?></H>
        <ul>
          <li><?php echo $items[0];?></li>
          <li><?php echo $items[1];?></li>
          <li><?php echo $items[2];?></li>
        </ul>
        
        <p>With template rules</p>
        <H>{{$title}}</H>
        @if(count($items) > 0)
          <ul>
            @foreach($items as $item)
              <li>{{$item}}</li>
            @endforeach
          </ul>
        @endif
      @endsection
      `}</Code>

      <LazyImg src='../imgs/laravel/passArrayIntoViewResult.png' />

      <H>Add CSS</H>

      <p><code>{'{{asset(path)}}'}</code> refers to <i>public</i> folder</p>

      <LazyImg src='../imgs/laravel/addCSSfile.png' />

      <H>Database for posts</H>

      <p>Do not forget to launch MySQL in XAMPP</p>

      <LazyImg src='../imgs/laravel/XAMPP.png' />

      <p>Create a new <code>laravelApp</code> database via <Lnk path="http://localhost/phpmyadmin">http://localhost/phpmyadmin</Lnk></p>
      <p>No need to create tables, because it will be done via <i>migrations</i>.</p>

      <LazyImg src='../imgs/laravel/phpMyAdmin.png' />

      <p>Let's create a new Controller for different database requests with <i>artisan</i> command <code>php artisan make:controller PostsController --resource</code></p>

      <p>Add routes for all new methods in our new <i>PostsController</i> automatically just at ones <code>Route::resource('/posts', PostsController::class)</code></p>

      <LazyImg src='../imgs/laravel/PostsControllerAndRoute.png' />

      <p>All available routes can be checked with <code>php artisan route:list</code></p>

      <LazyImg src='../imgs/laravel/artisanRouteList.png' />

      <H>Migration (tables creation)</H>

      <p>Also create a Model + 'migration' with <i>artisan</i> command <code>php artisan make:model Post -m</code></p>

      <p>Laravel <i>migration</i> is a way to create a table in DB without a database manager.</p>

      <p>Migrations allow to add or drop fields in a database without deleting the records already present, it is kind of a version control.</p>

      <p>Anything we want to add or execute / roll back during a migration goes inside the <code>up()</code> / <code>down()</code> methods.</p>

      <p>Prior that we need to provide details your database in <code>.env</code> file.</p>

      <p>Also uncomment <code>extension=pdo_mysql</code> & <code>extension=pdo_mysql</code> in <code>php.ini</code> at <Lnk>C:\xampp\php\php.ini</Lnk> & for me also at <Lnk>C:\php\php.ini</Lnk></p>

      <LazyImg src='../imgs/laravel/migrationFilePhpIniFileEnvFile.png' />

      <p>By the way I did not have to modify anything in <code>AppServiceProvider.php</code> file as suggested by Brad in his <Lnk path="https://youtu.be/neSHAWdE44c?t=358">video</Lnk> to resolve some errors.</p>

      <p>Trigger migrations with terminal <code>php artisan migrate</code></p>

      <LazyImg src='../imgs/laravel/migrateExecution.png' />

      <p>Tables have been added.</p>

      <LazyImg src='../imgs/laravel/tablesHaveBeenCreated.png' />

      <p>Posts table has same fields as we provided into migration file</p>

      <LazyImg src='../imgs/laravel/postsTableHasSameFieldsAsInMigrationFile.png' />

      <H>Initial data with tinker & eloquent</H>

      <p>We can supply initial data to our table via <code>php artisan tinker</code> and interact with our DB via <Lnk path="https://laravel.com/docs/8.x/eloquent">Eloquent</Lnk></p>

      <Code block php>{`
      php artisan tinker
      App\\Models\\Post::count();
      $post = new App\\Models\\Post();
      $post -> title = 'Post One';
      $post -> body = 'this is the post body';
      $post -> save();
      $post = new App\\Models\\Post();
      $post -> title = 'Post Two';
      $post -> body = 'this is post 2';
      $post -> save();
      `}</Code>

      <LazyImg src='../imgs/laravel/addLineIntoTableViaTinker.png' />

      <p>Now we add some data into <i>posts</i> table using <i>Post</i> model</p>

      <LazyImg src='../imgs/laravel/addLineIntoTableViaTinkerResult.png' />

      <H>Fetch data from database</H>

      <p>Because <i>PostsController</i> contains multiple methods by default including <code>index()</code> we may access <Lnk>http://localhost/laravelApp/public/posts</Lnk> which will be blank until we return something from the method.</p>

      <p>Let' return whole posts table from <code>index()</code> using <code>Post::all()</code> eloquent method.</p>

      <p>We can use different methods, like <code>{'Post::orderBy("title", "desc") -> get()'}</code> or <code>{'Post::where("title", "Post Two") -> get()'}</code></p>

      <LazyImg src='../imgs/laravel/returnWholePostsTable.png' />

      <LazyImg src='../imgs/laravel/resultOfReturnWholePostsTable.png' />

      <p>Let's make posts index blade and bring all posts data there via eloquent method <code>Post::all()</code>.</p>

      <LazyImg src='../imgs/laravel/bringAllPostsToPostsIndexBlade.png' />

      <LazyImg src='../imgs/laravel/resultBringAllPostsToPostsIndexBlade.png' />

      <p>Or we can use SQL statements instead of eloquent.</p>

      <LazyImg src='../imgs/laravel/useSQL.png' />

      <Hs>Fetch individual post</Hs>

      <p>We can make an individual page for a post and fetch data from database using id from the url.</p>

      <LazyImg src='../imgs/laravel/individualPost.png' />

      <LazyImg src='../imgs/laravel/clickOnPostLink.png' />

      <LazyImg src='../imgs/laravel/clickOnPostLinkResult.png' />

      <Hs>Pagination</Hs>

      <p>Pagination can be inserted automatically with following eloquent <code>{"Post::orderBy('title', 'asc') -> simplePaginate(1)"}</code></p>

      <p>We show only one post per page for presentation sake, because we have only two posts in our table.</p>

      <LazyImg src='../imgs/laravel/pagination.png' />

      <LazyImg src='../imgs/laravel/paginationResult.png' />

      <H>To be continued</H>

      <p>... let's <Lnk path="https://www.youtube.com/watch?v=-QapNzUE4V0&list=PLillGF-RfqbYhQsN5WMXy6VsDMKGadrJ-&index=7">continue</Lnk> with Laravel later, that is absolutely new realm which looks like not very popular in 2022.</p>
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
