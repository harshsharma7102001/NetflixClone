import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { MoviesService } from '../../shared/movies.service';
import { IVideoContent } from '../../shared/models/video-content.interface';
import { Observable, forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})
export class BrowseComponent implements OnInit {
  auth = inject(AuthService);
  movieServie = inject(MoviesService);
  name = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
  userProfileImg = JSON.parse(sessionStorage.getItem('loggedInUser')!).picture;
  email = JSON.parse(sessionStorage.getItem('loggedInUser')!).email;
  bannerDetail$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();

  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];
  sources = [
    this.movieServie.getMovies(),
    this.movieServie.getTvShows(),
    this.movieServie.getRatedMovies(),
    this.movieServie.getNowPlayingMovies(),
    this.movieServie.getUpcomingMovies(),
    this.movieServie.getTopRated(),
  ];
  signOut() {
    sessionStorage.removeItem('loggedInUser');
    this.auth.signOut();
  }
  ngOnInit(): void {
    forkJoin(this.sources)
      .pipe(
        map(
          ([
            movies,
            tvShows,
            ratedMovies,
            nowPlaying,
            upcoming,
            popular,
            topRated,
          ]) => {
            this.bannerDetail$ = this.movieServie.getBannerDetail(
              movies.results[1].id
            );
            console.log("Banner Detail is: ",this.bannerDetail$)
            this.bannerVideo$ = this.movieServie.getBannerVideo(
              movies.results[1].id
            );
            console.log("Bnaner video is: ",this.bannerVideo$)
            return {
              movies,
              tvShows,
              ratedMovies,
              nowPlaying,
              upcoming,
              popular,
              topRated,
            };
          }
        )
      )
      .subscribe((res: any) => {
        this.movies = res.movies.results as IVideoContent[];
        this.tvShows = res.tvShows.results as IVideoContent[];
        this.ratedMovies = res.ratedMovies.results as IVideoContent[];
        this.nowPlayingMovies = res.nowPlaying.results as IVideoContent[];
        this.upcomingMovies = res.upcoming.results as IVideoContent[];
        this.popularMovies = res.popular.results as IVideoContent[];
        this.topRatedMovies = res.topRated.results as IVideoContent[];
        this.getMovieKey();
      });
  }
  getMovieKey() {
    this.movieServie.getBannerVideo(this.movies[0].id)
    .subscribe(res=>{
      console.log(res);
    })
  }

  singOut() {
    sessionStorage.removeItem("loggedInUser");
    this.auth.signOut();
  }
}
