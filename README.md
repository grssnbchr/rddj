# .Rddj
## Resources for doing data journalism with R. 

This is a curated list of online resources for learning R in the context of data journalism. The live version is available under [rddj.info](http://rddj.info).

## Contribute

There are two ways you can contribute: 

### Contribute content

Saw a good article on using R for some data journalism? You can either send me the link and some description to timo(at)timogrossenbacher.ch, OR fork this project. All you need to do is to edit `content/content.json` and send me a pull request. **Attention**: Please consider the already existing structure of the JSON file, e.g.:

* Reuse existing chapter names in the `chapter` key (you can of course also open up a new chapter if nothing existing suits you).
* For `level` only use `Beginner`, `Intermediate` and `Advanced`.
* For `time` use something like `x - y [minutes, hours]` or `x [minute(s), hour(s)]`, although it is better to specify a range. 
* For `type` also reuse something already existing if possible.

Thank you! 

### Contribute to the website in general

In this case, you need to install all the dependencies and have `npm`, `bower` and `grunt-cli` installed. 
Then `cd` in the local clone of your fork, and 
```
npm install
bower install
```

Then, in order to run a test server with live preview,
```
grunt serve
```

Send me a pull request if you've made changes! I'll integrate them if it makes sense and build myself. 

## Roadmap

* Add filter options.
