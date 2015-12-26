# Contributing [![Stories in Ready][waffle-image]][waffle-url]

- [Forking and branching](#forking-and-branching)
- [Commit messages](#commit-messages)
- [Issues](#issues-)
- [Contributors](#contributors)

## Issues
If you have a suggestion or a bug fix, please [create an issue](https://github.com/furzeface/blackledge/issues/new) so we can discuss it.

## Forking and branching
Fork the project then create a neew branch to work on using [git flow](http://nvie.com/posts/a-successful-git-branching-model).

### Git flow
For a quick guide to using git flow, see [my blog post](http://furzeface.com/blog/git-flow-aint-scary) on the subject.

Use this for feature branching, with a short feature description or the [GitHub issue number](https://github.com/furzeface/blackledge/issues) as a branch name eg:
```sh
git flow feature start 39
```

```sh
git flow feature start header
```

Push to your fork
```sh
git push --set-upstream origin feature/MY-FEATURE
```

Then submit a [Pull Request](https://github.com/furzeface/blackledge/compare) for review and merging by a project owner.

## Commit messages
Try and adhere as closely as possible to the [Angular commit messages guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines). 

[Commitizen](https://github.com/commitizen/cz-cli) is a command line tool which can help with this:
```sh
npm install -g commitizen
```
Now, simply use `git cz` instead of `git commit` when committing.

## Issues [![Stories in Ready][waffle-image]][waffle-url]
Check out the issues in _Ready_ on the [Waffle board](https://waffle.io/furzeface/blackledge) and work away! 

### TODO
Extra tasks in the [Todo list](TODO.md).

## Contributors
See [contributors.md](contributors.md).

To update the list of contributors in `package.json` and [`contributors.md`](contributors.md):
```sh
npm i contributor -g
cd blackledge
contributor
```


[waffle-url]: https://waffle.io/furzeface/blackledge
[waffle-image]: https://badge.waffle.io/furzeface/blackledge.png?label=ready&title=Ready
